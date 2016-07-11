#riggl

Create Microservices with riggl.

[![Build Status](https://travis-ci.org/platdesign/riggl.svg?branch=master)](https://travis-ci.org/platdesign/riggl)




# Api (wip)
- **add(sig, handler)**
	- **sig** [object]
	- **handler(args)** [function] which should return a Promise.
- **act(sig)**
	- **sig** [object]
- **listen(config)**
	- **type** [string] e.g. `http`
	- **port** [number] default: 9876 (for type http)
	- **host** [string] default: '127.0.0.1'
- **client(config)**
	- **type**
	- **port**
	- **host**
	- **pin** [Array] Array of sigs to route to external service
- **ready(handler)**
	- **handler** [Function] will be executed when all connections are established.
- **close()** Will close the service and remove all listeners.



# Author

Christian Blaschke <mail@platdesign.de>
