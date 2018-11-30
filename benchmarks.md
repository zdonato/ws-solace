#Solace benchmarks using NodeJS and WebSockets

###Summary
We tested the time it takes for a message to travel from the Solace publisher to a NodeJS proxy server and then from that server to a UI.   

##Asynchronous Interval Test (10ms-25ms)
In this test set we used a Web Worker to schedule repeatedly sending a message at a given interval through JavaScript's setInterval method. 

A trial consists of 1,000 messages of the same twelve character string "Hello World!" being sent at fixed interval. We changed the value of the interval from 10ms to 25ms and ran each trial sixty times per interval.

###Results

####Message Integrity
Throughout all of the trials, no messages were lost.

####Speed
For the times from Solace to the NodeJS server, the mean fluctuated between 15.982ms and 16.680ms, while the deviation fluctuated between 8.112ms and 9.472ms. For example, between 10ms and 15ms intervals, the mean decreased by .68%, from 16.092ms to 15.982ms, while the standard deviation increased by 4.3%, from 8.112ms to 8.460ms. In contrast, between the 20ms and 25ms intervals, the mean increased by 1.7%, from 16.404ms to 16.680ms, while the standard deviation decreased by 2.6%, from 9.472ms to 9.224ms.    

The times from the NodeJS server to the UI had a slight decrease in both mean and deviation as the intervals increased. For example, between 10ms and 15ms, the mean decreased by 2.3%, from 1.095ms to 1.070ms, and standard deviation decreased by 3.2%, from 0.746ms to 0.722ms.

#####[Table 1] Time between Solace and node proxy server (over 60 trials)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | 9        | 61       | 11        | 13          | 16.092    | 8.112      |
| **15**        | 9        | 65       | 10        | 12          | 15.982    | 8.460      |
| **20**        | 9        | 75       | 11        | 13          | 16.404    | 9.472      |
| **25**        | 9        | 76       | 11        | 13          | 16.680    | 9.224      |


#####[Table 2] Time between node proxy server and UI (over 60 trials)

| Interval (ms) | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| ------------: | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **10**        | < 1      | 6        | 1         | 1           | 1.095     | 0.746      |
| **15**        | < 1      | 6        | 1         | 1           | 1.070     | 0.722      |
| **20**        | < 1      | 6        | 1         | 1           | 1.088     | 0.709      |
| **25**        | < 1      | 7        | 1         | 1           | 1.040     | 0.6823     |


##Synchronous for-loop Test (0ms)

###Summary

In this test set we used a for-loop to send all messages in a series.

A trial consists of 1,000 messages of the twelve character string "Hello World!" with no interval between the messages. Each trial was run sixty times.

###Results

###Message Integrity
Throughout all of the trials, no messages were lost.

###Speed
For the times from Solace to the NodeJS server, both mean and deviation sharply were markedly higher for the synchronous test then asynchronous tests. For example, when comparing to the asynchronous 10ms test, the synchronous test's mean was 1341% higher, from 16.092ms to 231.962ms. The standard deviation was 699% higher, from 8.112ms to 64.791ms. 

The times from the NodeJS server to the UI were also higher with the synchronous test than the asynchronous tests. Comparing again to the asynchronous 10ms test, the synchronous test's mean was 716% higher, from 1.095 to 8.939. The standard deviation was 2649% higher, from 0.746ms to 20.507ms. This standard deviation is 2.3 times greater than the mean, showing the possibility of multiple peaks in the distribution of times from the NodeJS server to the UI. 

#####[Table 3] Time between Solace and node proxy server (over 60 trials)

|  Test Type (ms)  | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| -------------:   | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **Sync (0ms)**   | 100      | 348      | 241       | 236         | 231.962   | 64.791     |
| **Async (10ms)** | 9        | 61       | 11        | 13          | 16.092    | 8.112      |

#####[Table 4] Time between node proxy server and UI (over 60 trials)

|  Test Type (ms)  | min (ms) | max (ms) | mode (ms) | median (ms) | mean (ms) | stdev (ms) |
| -------------:   | -------: | -------: | --------: | ----------: | --------: | ---------: |
| **Sync (0ms)**   | < 1      | 100      | 1         | 1           | 8.939     | 20.507     |
| **Async (10ms)** | < 1      | 6        | 1         | 1           | 1.095     | 0.746      |