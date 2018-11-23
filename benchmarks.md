## Solace benchmarks using Nodejs and WebSockets

###Summary

We tested tested the time it takes for a message to travel from the Solace publisher to a nodejs proxy server and then from the server to a UI.
The message used was the seven character string "newtext". For each trial, the total amount of messages was 1,000 and each message was sent in a fixed interval. We varied the value of the interval from 10ms to 25ms and group the results by interval set.   

###Results

####Messages Missing per Trial (n = 1000 messages)
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

####Statistics for time between Solace and node proxy server (n = 1000 messages, averaged over 20 trials each)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | 19       | 49       | 32        | 31          | 31.195    | 3.8502     |
| **15**        | 15       | 153      | 21        | 29          | 34.781    | 24.3904    |
| **20**        | 15       | 216      | 20        | 24          | 39.219    | 39.2188    |
| **25**        |  15      | 238      | 20        | 43          | 57.508    | 41.6339    |


####Statistics for time between node proxy server and UI (n = 1000 messages, averaged over 20 trials each)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | < 1      | 5        | 1         | 1           | 0.944     | 0.5956     |
| **15**        | < 1      | 6        | 1         | 1           | 0.974     | 0.6329     |
| **20**        | < 1      | 6        | 1         | 1           | 1.025     | 0.6204     |
| **25**        | < 1      | 5        | 1         | 1           | 1.036     | 0.6054     |