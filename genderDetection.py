from concurrent.futures import process
import json
import csv
from SlavicNames.parse_fio import fio_parse, gender_parse

data = json.load(open('data2015.json'))

# for article in data['articleData']:
#     article['gender'] = gender_parse(article['author'])
#     print(article['title'])

with open('data2015.csv', 'w', encoding='UTF8') as file:
    writer = csv.writer(file)
    writer.writerow(['title', 'dindex', 'author', 'rubric', 'link', 'selector', 'gender'])
    for article in data['articleData']:
        gender = gender_parse(article['author']).get('gender:')
        data = [article['title'], article['dindex'], article['author'], article['rubric'], article['selector'], gender]
        writer.writerow(data)