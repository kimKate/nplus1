import csv
 
male = 0
female = 0
with open('data2015.csv', newline='') as File:  
    reader = csv.reader(File)
    for row in reader:
        if row[-1] == 'm':
            male +=1 
        elif row[-1] == 'f':
            female += 1

print(male)
print(female)          