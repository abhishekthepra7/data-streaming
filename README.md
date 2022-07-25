#data-streaming

This project is divided into 3 service.

1. Data generator

2. Data Receiver

3. Processing service aka. Ansillary service



To Run this Project, NodeJS & redis should be installed on the system.

The data flow looks like below-

Data Generator service will generate packet at some random time interval. The generated data will be fed to Data Receiver.
Data Receiver service will first call the Ansillary service & then store the result into Redis.

When we have received & processed all the data packets for a primary resource id, We collate the output and put it into files in output directory.
