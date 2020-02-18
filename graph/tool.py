# %%

import numpy as np
import matplotlib.pyplot as plt
from firebase import data, initialize

# initialize()

non_means = [0, 0, 0, 0]  # 남자중의 후라이드 / 여자중의 후라이드
source_means = [0, 0, 0, 0]  # 남자중의 소스 / 여자중의 소스

for doc in data:
    if doc['item'] == 0:
        non_means[doc['answer'][1]] += 1
    else:
        source_means[doc['answer'][1]] += 1


labels = ['son', 'fork', 'binil', 'gita']


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
