import os 
rootdir = '/Users/chaerinnoh/renamed_memcat_imgs'

mem_imgs = os.listdir(rootdir)


target_imgs = []
with open(os.path.join(rootdir, 'target_list'), "r") as target_imgs_file:
    for target_img_line in target_imgs_file: 
        target_imgs.append(target_img_line.replace('\n',''))

filler_imgs = []
with open(os.path.join(rootdir, 'filler_list'), "r") as filler_imgs_file:
    for filler_img_line in filler_imgs_file: 
        filler_imgs.append(filler_img_line.replace('\n',''))


mem_img_list = 'const MEM_IMG_LIST = {}'.format(mem_imgs)

target_img_list = 'const TARGET_IMG_LIST = {}'.format(target_imgs)

filler_img_list = 'const FILLER_IMG_LIST = {}'.format(filler_imgs)

# print(target_img_list)
print(filler_img_list)
