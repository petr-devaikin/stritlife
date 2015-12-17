import json

from db import db, Photo, Tag, PhotoTag

steps = {}

if __name__ == '__main__':
    photos = [p.to_dict() for p in Photo.select() if p.tags.count() > 0]
    with open('data/photos.json', 'w') as fp:
        json.dump(photos, fp)
