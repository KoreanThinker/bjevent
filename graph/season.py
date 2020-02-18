# %%

import numpy as np
import matplotlib.pyplot as plt
from firebase import data, initialize

# initialize()

non_means = [0, 0]  # 문과 후라이드 / 이과 후라이드
source_means = [0, 0]  # 문과 소스 / 이과 소스

db = []
for doc in data:  # 쓸데이터
    if doc['number'][0] == "2":
        db.append(doc)

print(len(db))

for doc in db:
    isMoon = doc['number'][1] + doc['number'][2]
    isMoon = int(isMoon) < 7
    if doc['item'] == 0:
        non_means[0 if isMoon else 1] += 1
    else:
        source_means[0 if isMoon else 1] += 1


labels = ['moon', 'lee']


x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, non_means, width, label='nonSource')
rects2 = ax.bar(x + width/2, source_means, width, label='source')

# Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('Scores')
# ax.set_title('Scores by group and gender')
ax.set_xticks(x)
ax.set_xticklabels(labels)
ax.legend()


def autolabel(rects):
    """Attach a text label above each bar in *rects*, displaying its height."""
    for rect in rects:
        height = rect.get_height()
        ax.annotate('{}'.format(height),
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),  # 3 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom')


autolabel(rects1)
autolabel(rects2)

fig.tight_layout()

plt.show()
# %%
