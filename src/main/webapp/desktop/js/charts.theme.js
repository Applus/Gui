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
	yAxis : {
		title : {
			style : {
				color : '#FFFFFF',
				fontWeight : 'bold',
				'font-size' : '12pt'

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