# imports
import os
import random
import math
import copy

import numpy as np
import pandas as pd

# parameters
LIST_N = 10
LAG_CONDITIONS = [1,2,3,4,5]
LAG_CONDITION_N = len(LAG_CONDITIONS)
IMG_PATH = '/Users/chaerinnoh/renamed_memcat_imgs'
SUB_CATEGORIES = [
    'wetland','valley', 'shore', 'sea', 'field', 
    'mountain', 'badlands', 'plantation', 'geyser', 'river', 
    'jungle', 'volcano', 'creek', 'lake', 'icescape',
    'savanna', 'barn', 'desert', 'pasture', 'waterfall'
] 
SUB_CATEGORY_N = len(SUB_CATEGORIES)
TARGET_N_PER_CATEGORY = 10
FILLER_N_PER_CATEGORY = 5
TARGET_N_PER_CATEGORY_PER_LAG = int(TARGET_N_PER_CATEGORY/LAG_CONDITION_N)
TARGET_N = SUB_CATEGORY_N * TARGET_N_PER_CATEGORY
FILLER_N = SUB_CATEGORY_N * FILLER_N_PER_CATEGORY
TOTAL_TRIAL_N = TARGET_N*2 + FILLER_N
BLOCK_N = 4
TRIAL_N_PER_BLOCK = TOTAL_TRIAL_N / BLOCK_N
LAST_TRIAL_NUM_EACH_BLOCK = [TRIAL_N_PER_BLOCK*b for b in range(1, BLOCK_N+1)]

# load images
img_names =  os.listdir(IMG_PATH)

#img_names = [name[len(IMG_PATH):] for name in img_names]
random.shuffle(img_names)
target_img_dict = {s:[] for s in SUB_CATEGORIES}
filler_img_dict = {s:[] for s in SUB_CATEGORIES}
filler_img_list = []
for name in img_names:
    splitted_name = name.split('_')
    if splitted_name[0]=='target':
        target_img_dict[splitted_name[1]].append(name)
    else:
        filler_img_dict[splitted_name[1]].append(name)
        filler_img_list.append(name)

target_img_count = np.array([len(v) for _, v in target_img_dict.items()])
filler_img_count = np.array([len(v) for _, v in filler_img_dict.items()])
assert (target_img_count==TARGET_N_PER_CATEGORY).all()
assert (filler_img_count==FILLER_N_PER_CATEGORY).all()
assert len(filler_img_list) == FILLER_N

# slot in the targets to the trial list
for l in range(1,LIST_N+1):
    # define empty trial list
    trial_dict = {k: None for k in range(1, TOTAL_TRIAL_N+1)}
    trial_dict_keys = list(trial_dict.keys())
    this_target_img_dict = copy.deepcopy(target_img_dict)
    this_filler_img_list = copy.deepcopy(filler_img_list)
    for lag in LAG_CONDITIONS:
        for sub in SUB_CATEGORIES:
            for _ in range(TARGET_N_PER_CATEGORY_PER_LAG):
                while True:
                    this_trial_num = random.choice(trial_dict_keys)
                    repeat_trial_num = this_trial_num + lag + 1
                    if repeat_trial_num not in trial_dict_keys:
                        continue # resample if the repeat trial is not available
                    this_block = math.ceil(this_trial_num/TRIAL_N_PER_BLOCK)
                    repeat_block = math.ceil(repeat_trial_num/TRIAL_N_PER_BLOCK)
                    if this_block != repeat_block:
                        continue # resample if the repeat trial cross block boundary
                    this_target = this_target_img_dict[sub].pop(0)
                    trial_dict[this_trial_num] = (this_target, 'target')
                    trial_dict[repeat_trial_num] = (this_target, 'repeat')
                    trial_dict_keys.remove(this_trial_num)
                    trial_dict_keys.remove(repeat_trial_num)
                    break
    
    # fill the rest of the slots with fillers
    for t in trial_dict_keys:
        this_filler = this_filler_img_list.pop(0)
        trial_dict[t] = (this_filler, 'filler')

    # save trial list
    this_trials = pd.DataFrame.from_dict(trial_dict, orient='index', columns=['imgName', 'trialType'])
    this_trials.to_csv('trial_list_'+str(l)+'.csv')
    trial_file_name = './mem_list_{}.js'.format(l)
    trial_file_content = 'const MEM_LIST_{} = {}'.format(l, this_trials.values.tolist())
    trial_file = open(trial_file_name, "w")
    trial_file.write(trial_file_content)
    trial_file.close()
    print(trial_file_name)
