//Highcharts.setOptions({
//	global: {
//		useUTC: false
//	}
//});

Highcharts.theme = {
	chart : {
		backgroundColor : '#2D2D2D'
	},
	title : {
		style : {
			color : '#FFFFFF',
			fontWeight : 'bold',
			'font-size' : '1.5em'

		}
	},
	yAxis : {
		title : {
			style : {
				color : '#FFFFFF',
				fontWeight : 'bold',
				'font-size' : '1em'

			}
		},
		labels : {
			style : {
				color : 'white'
			}
		},
	},
	xAxis : {
		labels : {
			style : {
				color : 'white'

			}
		},
	},
	legend : {
		itemStyle : {
			color : 'white'
		}
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
