import numpy as np
import matplotlib.pyplot as plt
from firebase import data


def item():
    sizes = [0, 0]
    for doc in data:
        if doc['item'] == 0:
            sizes[0] += 1
        else:
            sizes[1] += 1
    print(sizes)
    labels = sizes[0], sizes[1]
    # 그래프 선언
    explode = (0, 0)  # only "explode" the 2nd slice (i.e. 'Hogs')

    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels,
            autopct='%1.1f%%', shadow=True, startangle=90)
    # Equal aspect ratio ensures that pie is drawn as a circle.
    ax1.axis('equal')

    plt.show()
