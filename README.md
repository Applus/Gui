# Gui
The Applus Gui is developed with standard web technologies. It allows the visualization of energetic consumption data and enviroment comfort data. It also allows to interact with data.
It is subdivided in Desktop Gui and Mobile Gui.

## Desktop Version

### Structure

* Energy consumption   
Data concerning electric consumption are represented by two different dashbords: the first one is static while the second one is interactive.
Each dashboard is formed by other HTML pages wrapped together through the AngularJS library.

* Climate monitoring   
Data concerning climatic conditions are represented by a unique dashboard showing graphs and instant values.

* Data analysis   
Link to IndexGui Application

### Libraries

* jquery 1.10.2 http://jquery.com/
* jqueryui 1.10.2 http://jqueryui.com/
* angular js 1.08 http://angularjs.org/
* highcharts 2.3.5 http://www.highcharts.com/
* highstock 2.3.5 http://www.highcharts.com/
* highcharts-more 2.3.5 http://www.highcharts.com/
* justgage 1.0.1 http://justgage.com/
* moment 2.0.0 http://justgage.com/
* raphael 2.1.0 http://raphaeljs.com/
* jquery.raty 2.5.2 http://wbotelhos.com/raty
* gauge 1.2 http://bernii.github.io/gauge.js/

## Versione mobile

### Struttura
The structure is the same of desktop, with the exception of Data Analysis

### Libraries

* jquery 1.9.1 http://jquery.com/
* jqueryui 1.9.1 http://jqueryui.com/
* jquerymobile 1.3.0 http://jquerymobile.com/
* angular js 1.08 http://angularjs.org/
* highcharts 2.3.5 http://www.highcharts.com/
* highstock 2.3.5 http://www.highcharts.com/
* highcharts-more 2.3.5 http://www.highcharts.com/
* justgage 1.0.1 http://justgage.com/
* moment 2.0.0 http://momentjs.com/
* raphael 2.1.0 http://raphaeljs.com/
* jquery.raty 2.5.2 http://wbotelhos.com/raty

## Installation

The installation is done by a .war file. It is provided a configuration file (config.js) where specify the server address for the REST request.
