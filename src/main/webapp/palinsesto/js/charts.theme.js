Highcharts.theme = {
	chart : {
		backgroundColor : '#2D2D2D'
	},
	title : {
		style : {
			color : '#FFFFFF',
			fontWeight : 'bold',
			'font-size' : '16pt'

		}
	},
	 plotOptions: {
         column: {
             dataLabels: {
                 enabled: true,
                 color: 'white',
                 style: {
                     fontWeight:'bold',
                     fontSize:'20pt'
                 },
     			y: -3
             }
         }
     },
	yAxis : {
		title : {
			style : {
				color : '#D8D8D8',
				fontWeight : 'bold',
				'font-size' : '22pt'

			}
		},
		gridLineColor: '#585858'
	},
	xAxis : {
		title : {
			style : {
				color : '#D8D8D8',
				fontWeight : 'bold',
				'font-size' : '22pt'				
			}
			
		},
		labels : {
			style : {
				font : '22px Helvetica',
				fontWeight : 'bold',
				color : '#FFFFFF'
			},
			y:30
		},
	},
	legend : {
		itemStyle : {
			color : 'white',
			fontWeight : 'bold',
			fontSize : '18pt'
		}
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);