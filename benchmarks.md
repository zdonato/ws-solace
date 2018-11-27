## Solace benchmarks using NodeJS and WebSockets

###Summary

We tested the time it takes for a message to travel from the Solace publisher to a NodeJS proxy server and then from that server to a UI.

A trial consists of 1,000 messages of the same twelve character string "Hello World!" being sent at fixed interval. We changed the value of the interval from 10ms to 25ms and tested each trial twenty times.   

###Results

####Message Integrity

Throughout the trials, no messages were lost.

#####[Table 1] Messages Missing per Trial
| Trial # | 10 ms   | 15 ms   | 20 ms   | 25 ms   |  
| ------: | ------: | ------: | ------: | ------: |
| **1**   | 0       | 0       | 0       | 0       |
| **2**   | 0       | 0       | 0       | 0       |
| **3**   | 0       | 0       | 0       | 0       |
| **4**   | 0       | 0       | 0       | 0       |
| **5**   | 0       | 0       | 0       | 0       |
| **6**   | 0       | 0       | 0       | 0       |
| **7**   | 0       | 0       | 0       | 0       |
| **8**   | 0       | 0       | 0       | 0       |
| **9**   | 0       | 0       | 0       | 0       |
| **10**  | 0       | 0       | 0       | 0       |
| **11**  | 0       | 0       | 0       | 0       |
| **12**  | 0       | 0       | 0       | 0       |
| **13**  | 0       | 0       | 0       | 0       |
| **14**  | 0       | 0       | 0       | 0       |
| **15**  | 0       | 0       | 0       | 0       |
| **16**  | 0       | 0       | 0       | 0       |
| **17**  | 0       | 0       | 0       | 0       | 
| **18**  | 0       | 0       | 0       | 0       |
| **19**  | 0       | 0       | 0       | 0       |
| **20**  | 0       | 0       | 0       | 0       |


####Speed
For the times from Solace to the NodeJS server, both mean and deviation sharply increased with the interval. For example, between 10ms and 15ms, the standard deviation increased 633%, from 3.8502ms to 24.3904ms. The standard deviation increased from 12% of the mean to 70% of the mean between the 10ms and 15ms intervals respectively.  

The times from the NodeJS server to the UI has a slight increase in mean and deviation, less than .1ms, with a mean of 0.944ms at 10ms and a mean of 1.036ms at 25ms. Furthermore, the maximimum values stayed consistent throughout the intervals and do not exceed 6ms. 

#####[Table 2] Statistics for time between Solace and node proxy server (over 20 trials)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | 19       | 49       | 32        | 31          | 31.195    | 3.8502     |
| **15**        | 15       | 153      | 21        | 29          | 34.781    | 24.3904    |
| **20**        | 15       | 216      | 20        | 24          | 39.219    | 39.2188    |
| **25**        | 15       | 238      | 20        | 43          | 57.508    | 41.6339    |


#####[Table 3] Statistics for time between node proxy server and UI (over 20 trials)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | < 1      | 5        | 1         | 1           | 0.944     | 0.5956     |
| **15**        | < 1      | 6        | 1         | 1           | 0.974     | 0.6329     |
| **20**        | < 1      | 6        | 1         | 1           | 1.025     | 0.6204     |
| **25**        | < 1      | 5        | 1         | 1           | 1.036     | 0.6054     |