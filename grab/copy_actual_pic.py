import os
import shutil

from db import Photo,PhotoTag, Tag

img_path = 'data/img/%s.jpg'
new_path = 'data/aimg/%s.jpg'

if __name__ == "__main__":
    n = 0
    for p in Photo.select():
        n += 1
        if n % 100 == 0:
            print 'processed: ' + str(n)

        shutil.copyfile(img_path % p.insta_id, new_path % p.insta_id,)



