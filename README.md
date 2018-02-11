# BackInBlack

This project was created for completing the Fortumo's home assignment.

## Task 1

The first task shows a dashboard with information about the GTV key performance indicator (KPI). Since this data will be constantly updated throughout the year, I simulated a situation in which new data comes and the dashboard updates the information accordingly.

For all graphs, there are two primary colors: green and red. When the value has not reached the target (field endOfYearTarget), then the information is shown in red. When the value reaches the target (as in December in the current example), then the information is displayed in green.

The vertical bar graph shows the total volume as it comes from the provided data. The month information is added to it, assuming that the first value is for January, the second for February, and so on.

The upper right graph shows the last value from the provided data. Assuming that the bar chart is showing information until August, then this graph shows the value for August. This is done so that it is easy to determine the exact current value, since you need to hover over a bar to see its value. There's also a line that changes its color according to the rules stated above.

The lower right graph shows the values from all the current months. This is also done to aid the information in the graph.

Since the component asks the service for a KPI object, the application could be adjusted to display X amount of KPIs. However, they wouldn't be able to be shown one next to the other, but one by one.

## Task 2

The second task deals with the Fortumo's customer portal. It is self-explanatory, with sections for different improvements suggested after thoroughly using the website in desktop and mobile devices. I asked for help from other people in order to reach some conclusions, which is a practice I normally do with almost all of my projects.

## Limitations

As the dashboard is meant for displaying in big screens (as per the instructions), the site is laid out in a way that maximizes screen usage. This means that, although it doesn't break, the app does not display in a good way on mobile devices.

Also, because the assignment stated compatibility with Chrome, then my testing was done in the latest version of Chrome and Opera. Edge and Firefox work fine except for an overlap in the text of one graph. This is a problem with the graph library itself.