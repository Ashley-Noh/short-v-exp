// Saving Data 
const FORMAL = false;
const EXPERIMENT_NAME = 'memtyp';
const SUBJ_NUM_SCRIPT = 'subjNum.php';
const SAVING_SCRIPT = 'save.php';
const VISIT_FILE = 'visit_' + EXPERIMENT_NAME + '.txt';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const ATTRITION_FILE = 'attrition_' + EXPERIMENT_NAME + '.txt';
const RATING_FILE = 'rating_' + EXPERIMENT_NAME + '.txt';
const MEM_FILE  = 'mem_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = 'subj_' + EXPERIMENT_NAME + '.txt';
const SAVING_DIR = FORMAL ? '/var/www-data-experiments/cvlstudy_data/CN/'+EXPERIMENT_NAME+'/formal' : '/var/www-data-experiments/cvlstudy_data/CN/'+EXPERIMENT_NAME+'/testing';
const ID_GET_VARIABLE_NAME = 'id';
const COMPLETION_URL = 'https://ycc.vision/'; // XXX

//Mem Stimuli
const MEM_TRIAL_LIST_INDEX = range(0,9);

// CHANGE
const MEM_TRIAL_LISTS_LIST = [
    MEM_LIST_1
]

const STIM_PATH = 'images/';
const RATING_PRACTICE_LIST = ['prac.jpg'];
const RATING_PRACTICE_TRIAL_N = RATING_PRACTICE_LIST.length;
const RATING_IMG_LIST = shuffle_array(TARGET_LIST.concat(RATING_FILLER_LIST)).concat(shuffle_array(RATING_FILLER_LIST));
const RATING_TRIAL_N = RATING_IMG_LIST.length;
const RATING_INSTR_TRIAL_N = RATING_PRACTICE_TRIAL_N + RATING_TRIAL_N;
const MEM_PRACTICE_IMG = [
    'eating_alone.jpg', 'eating_group.jpg',
    'working_alone.jpg', 'working_group.jpg',
    'interviewing_alone.jpg', 'interviewing_group.jpg'
];
const MEM_PRACTICE_LIST = [
    ['eating_alone.jpg', 'prac'],
    ['eating_group.jpg', 'prac'],
    ['working_alone.jpg', 'prac'],
    ['working_group.jpg', 'prac'],
    ['interviewing_alone.jpg', 'prac'],
    ['interviewing_group.jpg', 'prac'],
    ['eating_alone.jpg', 'prac'],
    ['working_group.jpg', 'prac']
];
const MEM_PRACTICE_TRIAL_N = MEM_PRACTICE_LIST.length;
const MEM_TRIAL_N = MEM_IMG_LIST.length;
const MEM_INSTR_TRIAL_N = MEM_PRACTICE_TRIAL_N + MEM_TRIAL_N;
const INTERTRIAL_INTERVAL = 0.5;
const INTERTRIAL_INTERVAL_MEM = 1.2;
const INSTR_IMG_LIST = ['maximize_window.png'];
const ALL_IMG_LIST = RATING_PRACTICE_LIST.concat(INSTR_IMG_LIST).concat(MEM_IMG_LIST).concat(MEM_PRACTICE_IMG);

const REST_TRIAL_N = 125 ;

// criteria
const VIEWPORT_MIN_W = 500; // XXX 800/600
const VIEWPORT_MIN_H = 300;
const INSTR_READING_TIME_MIN = 0.3;


// object variables
let subj, instr, task_mem, task_rating;


$(document).ready(function() {
    subj = new Subject(subj_options);
    subj.id = subj.getID(ID_GET_VARIABLE_NAME);
    subj.saveVisit();
    if (subj.phone) {
        halt_experiment('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at yichiachen@ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    } else if (subj.validID){
        load_img(0, STIM_PATH, ALL_IMG_LIST);
        instr = new Instructions(instr_options);
        instr.start();
    } else {
        halt_experiment('There was an error in retrieving your SONA number. Please retry by starting the experiment again from the link at the sona website. If you have questions, please email yichiachen@g.ucla.edu.');
    }
});

function halt_experiment(explanation) {
    $('.box').hide();
    $('#instruction-text').html(explanation);
    $('#next-button').hide();
    $('#instruction-box').show();
}

function ajax_failed() {
    halt_experiment('SERVER ERROR: Please email yichiachen@g.ucla.edu with the message "AJAX-ERR" to receive credit.');
}

//  ######  ##     ## ########        ## ########  ######  ########
// ##    ## ##     ## ##     ##       ## ##       ##    ##    ##
// ##       ##     ## ##     ##       ## ##       ##          ##
//  ######  ##     ## ########        ## ######   ##          ##
//       ## ##     ## ##     ## ##    ## ##       ##          ##
// ##    ## ##     ## ##     ## ##    ## ##       ##    ##    ##
//  ######   #######  ########   ######  ########  ######     ##

const SUBJ_TITLES = [
    'num',
    'date',
    'startTime',
    'id',
    'userAgent',
    'endTime',
    'duration',
    'condition',
    'quizAttemptN',
    'instrReadingTimes',
    'quickReadingPageN',
    'hiddenCount',
    'hiddenDurations',
    'serious',
    'maximized',
    'problems',
    'gender',
    'age',
    'inView',
    'viewportW',
    'viewportH'
];

function update_task_object_subj_num() {
    if (typeof task_mem !== 'undefined'){
        task_mem.num = subj.num;
        task_mem.trialList = MEM_TRIAL_LISTS_LIST[subj.condition];
    }
    if (typeof task_rating !== 'undefined'){
        task_rating.num = subj.num;
    }
}

let subj_options = {
    titles: SUBJ_TITLES,
    condition: 0,
    conditionList: MEM_TRIAL_LIST_INDEX,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    subjNumCallback: update_task_object_subj_num,
    subjNumScript: SUBJ_NUM_SCRIPT,
    savingScript: SAVING_SCRIPT,
    subjNumFile: SUBJ_NUM_FILE,
    visitFile: VISIT_FILE,
    attritionFile: ATTRITION_FILE,
    subjFile: SUBJ_FILE,
    savingDir: SAVING_DIR
};


// #### ##    ##  ######  ######## ########  ##     ##  ######  ######## ####  #######  ##    ##  ######
//  ##  ###   ## ##    ##    ##    ##     ## ##     ## ##    ##    ##     ##  ##     ## ###   ## ##    ##
//  ##  ####  ## ##          ##    ##     ## ##     ## ##          ##     ##  ##     ## ####  ## ##
//  ##  ## ## ##  ######     ##    ########  ##     ## ##          ##     ##  ##     ## ## ## ##  ######
//  ##  ##  ####       ##    ##    ##   ##   ##     ## ##          ##     ##  ##     ## ##  ####       ##
//  ##  ##   ### ##    ##    ##    ##    ##  ##     ## ##    ##    ##     ##  ##     ## ##   ### ##    ##
// #### ##    ##  ######     ##    ##     ##  #######   ######     ##    ####  #######  ##    ##  ######

let instructions = [
    // First instruction: Memory task set
    [false, false, 'Welcome!<br /><br />The study is about 60 minutes long. <br />Please read the instructions carefully, and do not use the refresh or back buttons.'],
    [show_maximize_window, false, 'For this study to work, the webpage will automatically switch to the full-screen view on the next page. Please stay in the full screen mode until the study automatically switches out from it.'],
    [hide_instr_img, maximize_window, 'This study has two parts. We will walk you through the first part now and explain the second part later.'],
    [false, false, "In the first part, we are interested in people's ability to memorize images."],
    [false, false, 'You will view a series of images one by one. Some of the images will repeat in the sequence after a few other images. Your job is to catch those! When you see an image that you have previously encountered, press the "r" key in the keyboard (for "repeat").'],
    [false, false, 'Each image will stay on the screen for only 1.2 seconds, so you should respond within that time frame if it is a repeat. Otherwise, the image will automatically disappear and replace by the next image.'],
    [false, false, "The next page is a quick instruction quiz. (It's very easy!)"],
    [false, show_instr_question_mem, ''],
    [show_consent, false, "Great! Now we are starting! Please stay focused and don't switch to other windows or tabs. <br /><br />Press SPACE to start."],
    // Second instruction: Rating task set
    [show_next_button, false, "We are now starting the second part of the experiment. Here, we are interested in your aesthetic preferences. "],
    [false, false, 'You will view a series of images one by one. Your job is to indicate how visually pleasing each image appears to you.'],
    [false, false, 'You will use a rating scale from 1 to 6, with 1 meaning "not at all visually pleasing" and 6 meaning "very visually pleasing".'],
    [false, false, 'The next page is a quick instruction quiz.'],
    [false, show_instr_question_rating, ''],
    [task_rating_pre, false, "Great! Now we are starting the second part! Again, please don't switch to other windows or tabs. <br /><br />Press SPACE to start."]
];

function show_next_button() {
    $('#next-button').show();
}

function show_instr_img(file_name) {
    $('#instr-img').attr('src', STIM_PATH + file_name);
    $('#instr-img').css('display', 'block');
}

function hide_instr_img() {
    $('#instr-img').css('display', 'none');
}

function show_maximize_window() {
    show_instr_img('maximize_window.png');
}

function show_instr_question_mem() {
    $('#instruction-box').hide();
    $('#quiz-box-mem').show();
    $('#quiz-submit-btn-mem').attr("onclick","submit_instruction_quiz('#quiz-box-mem','repeat', 2)");
}

function show_instr_question_rating() {
    $('#instruction-box').hide();
    $('#quiz-box-rating').show();
    $('#quiz-submit-btn-rating').attr("onclick","submit_instruction_quiz('#quiz-box-rating','visual', 8)");
}

function submit_instruction_quiz(quiz_box_id, correct_answer, default_index) {
    let choice = $('input[name="quiz"]:checked').val();
    if (typeof choice === 'undefined') {
        $('#quiz-warning').text('Please answer the question. Thank you!');
    } else if (choice != correct_answer) {
        $(quiz_box_id).hide();
        let quiz_cond = quiz_box_id.split('-')[-1]; // mem or rating
        instr.quizAttemptN[quiz_cond] += 1;
        instr.saveReadingTime();
        $('#instruction-text').text('You have given an incorrect answer. Please read the instructions again carefully.');
        $('#instruction-box').show();
        instr.startTime = Date.now();
        instr.index = default_index;
        $('input[name="quiz"]:checked').prop('checked', false);
    } else {
        instr.next();
        $(quiz_box_id).hide();
        $('input[name="quiz"]:checked').prop('checked', false);
        $('#instruction-box').show();
    }
}

function show_consent() {
    $('#next-button').hide();
    $('#consent-form').show();
    $(document).keyup(function(e) {
        if (e.key == ' ') {
            $(document).off('keyup');
            instr.saveReadingTime();
            $('#consent-form').hide();
            $('#instruction-box').hide();
            instr.next();
            subj.saveAttrition();
            show_task_mem();
        }
    });
}

function task_rating_pre() {
    $('#next-button').hide();
    $('.progress-text').show();
    $(document).keyup(function(e) {
        if (e.key == ' ') {
            $(document).off('keyup');
            instr.saveReadingTime();
            $('#instruction-box').hide();
            instr.next();
            subj.saveAttrition();
            show_task_rating();
        }
    });
}

let instr_options = {
    textBox: $('#instruction-box'),
    textElement: $('#instruction-text'),
    arr: instructions,
    quizConditions: ['mem', 'rating']
};

// ########    ###     ######  ##    ##
//    ##      ## ##   ##    ## ##   ##
//    ##     ##   ##  ##       ##  ##
//    ##    ##     ##  ######  #####
//    ##    #########       ## ##  ##
//    ##    ##     ## ##    ## ##   ##
//    ##    ##     ##  ######  ##    ##

const RATING_TASK_TITLES = [
    'num',
    'date',
    'subjStartTime',
    'trialNum',
    'stimName',
    'inView',
    'response',
    'rt'
];

const MEM_TASK_TITLES = [
    'num',
    'date',
    'subjStartTime',
    'trialNum',
    'stimType',
    'stimName',
    'inView',
    'response',
    'rt'
];

function show_task_mem() {
    task_options_mem['subj'] = subj;
    task_options_mem['trialList'] = MEM_TRIAL_LISTS_LIST[subj.condition];
    task_mem = new Task(task_options_mem);
    $('#task-box').show();
    $('#rating-area').hide();
    $('#instruction-box').hide();
    $('.progress-text').hide();
    subj.detectVisibilityStart();
    task_mem.run();
}

function show_task_rating() {
    task_options_rating['subj'] = subj;
    task_rating = new Task(task_options_rating);
    $('#task-box').show();
    $('#rating-area').show();
    $('#instruction-box').hide();
    subj.detectVisibilityStart();
    task_rating.run();
}

function mem() {
    $('#test-img').show();
    task_mem.inView = check_fully_in_view($('#test-img'));
    task_mem.keypress = 'n'
    $(document).keyup(function(e) {
        if (e.key == 'r') {
            $(document).off('keyup');
            $('#test-img').css('border-color', 'white');
            task_mem.keypress = 'r';
        }
    });

    function hide_img() {
        $(document).off('keyup');
        $('#test-img').hide();
        $('#test-img').css('border-color', '#1f1f1f');
        END_MEM_TRIAL(task_mem.keypress);
    }

    setTimeout(hide_img, INTERTRIAL_INTERVAL_MEM * 1000);
}

function END_MEM_TRIAL(resp) {
    var current_time = Date.now();
    task_mem.rt = (current_time - task_mem.startTime) / 1000;
    task_mem.response = resp;
    if (task_mem.trialNum > 0) {
        var dataList = list_from_attribute_names(task_mem, task_mem.titles);
        task_mem.allData += list_to_formatted_string(dataList);
    }
    if (task_mem.trialNum >= task_mem.trialN) {
        task_mem.complete = true;
        task_mem.endExptFunc();
    } else if (task_mem.trialNum % REST_TRIAL_N == 0 && task_mem.trialNum > 0) {
        task_mem.rest($('#rest-box'), $('#rest-text'), task_mem.run); 
    } else {
        task_mem.run();
    }
}

function rating() {
    $('#test-img').show();
    $('.rating-button').mouseup(
        function(event) {
            $('.rating-button').unbind('mouseup');
            task_rating.inView = check_fully_in_view($('#test-img'));
            $('#test-img').hide();
            let response = $(event.target).attr('id');
            task_rating.end(response);
        }
    );
}

function task_update_rating(formal_trial, last, this_trial, next_trial, path) {
    task_rating.stimName = this_trial;
    $('#trial-progress').text(task_rating.progress);
    $('#test-img').attr('src', path + this_trial);
    if (!last) {
        $('#buffer-img').attr('src', path + next_trial);
    }
}

function task_update_mem(formal_trial, last, this_trial, next_trial, path) {
    task_mem.stimName = this_trial[0];
    task_mem.stimType = this_trial[1];
    $('#trial-progress').text(task_mem.progress);
    const trial_path = path + this_trial[0];
    $('#test-img').attr('src', trial_path);
    if (!last) {
        $('#buffer-img').attr('src', path + next_trial[0]);
    }
}

function end_task_mem() {
    subj.detectVisibilityEnd();
    $('#task-box').hide();
    $('#instruction-box').show();
    task_mem.save();
}

function end_task_rating() {
    subj.detectVisibilityEnd();
    $('#task-box').hide();
    $('#debrief-question-box').show();
    task_rating.save();
}

var task_options_rating = {
    titles: RATING_TASK_TITLES,
    pracTrialN: RATING_PRACTICE_TRIAL_N,
    trialN: RATING_TRIAL_N,
    savingScript: SAVING_SCRIPT,
    dataFile: RATING_FILE,
    stimPath: STIM_PATH,
    savingDir: SAVING_DIR,
    trialList: RATING_IMG_LIST,
    pracList: RATING_PRACTICE_LIST,
    intertrialInterval: INTERTRIAL_INTERVAL,
    updateFunc: task_update_rating,
    trialFunc: rating,
    endExptFunc: end_task_rating,
    progressInfo: true,
}

var task_options_mem = {
    titles: MEM_TASK_TITLES,
    pracTrialN: MEM_PRACTICE_TRIAL_N,
    trialN: MEM_TRIAL_N,
    savingScript: SAVING_SCRIPT,
    dataFile: MEM_FILE,
    stimPath: STIM_PATH,
    savingDir: SAVING_DIR,
    trialList: false,
    pracList: MEM_PRACTICE_LIST,
    intertrialInterval: INTERTRIAL_INTERVAL_MEM,
    updateFunc: task_update_mem,
    trialFunc: mem,
    endExptFunc: end_task_mem,
    progressInfo: true
}

function submit_debriefing_questions() {
    const OPEN_ENDED_ATTRIBUTE_NAMES = ['problems', 'age'];
    const CHOICE_ATTRIBUTE_NAMES = ['serious', 'maximized', 'gender'];
    const ALL_RESPONDED = show_hide_warnings(OPEN_ENDED_ATTRIBUTE_NAMES, CHOICE_ATTRIBUTE_NAMES);
    if (ALL_RESPONDED) {
        for (let a of OPEN_ENDED_ATTRIBUTE_NAMES) {
            subj[a] = subj[a].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.quizAttemptN = instr.quizAttemptN['onlyQ'];
        subj.instrReadingTimes = JSON.stringify(instr.readingTimes);
        subj.quickReadingPageN = Object.values(instr.readingTimes).filter(d => d < INSTR_READING_TIME_MIN).length;
        subj.submitQ();
        $('#debrief-question-box').hide();
        exit_maximize_window();
        allow_selection();
        $('#debrief-box').show();
        $('body').scrollTop(0);
    }
}

function end_to_sona() {
    window.location = COMPLETION_URL+subj.id;
}