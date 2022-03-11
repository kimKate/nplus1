import matplotlib.pyplot as plt
import pandas as pd

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
 

medal_data = [female, male]
all = female + male
colors = ["#FFB6C1", "#00BFFF"]
explode = (0, 0)  
plt.pie(medal_data, labels=['female', 'male'], explode=explode, colors=colors,
autopct='%1.1f%%', shadow=True, startangle=140)
plt.title("Authors of " + str(all) + " articles in 2015")
plt.show()