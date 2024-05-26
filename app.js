const AppVars = {
	billAmt: '',
	tipPercent: '',
	people: '',
};

$(document).ready(function () {
	// focus on load
	$('#bill').focus();

	// on bill keyup
	$('#bill').on('keyup', function () {
		if ($('#bill').val() != '') {
			AppVars.billAmt = $('#bill').val().trim();
			$('.tip').addClass('enable_tip');
			checkBillValue();
		} else {
			$('.tip').removeClass('enable_tip tip_selected');
			$('#people').val('').removeClass('enable_input');
			$('#bill').focus();

			$('.bill_amt').html('0.00');
			$('.tip_amt').html('0.00');
			$('.total_amt').html('0.00');
		}
		if ($('#people').val() != '') {
			calculateBillPp();
			calculateTipPp();
			calculateTotalPp();
		} else {
		}
		// console.log(billAmt);
	});

	// on tip click
	$('p.tip').on('click', function () {
		$('p.tip').removeClass('tip_selected');
		$(this).addClass('tip_selected');
		AppVars.tipPercent = $(this).data('number');
		$('#people').focus().addClass('enable_input');
		// console.log(AppVars.tipPercent);
	});

	// on custom tip click
	$('.custom_tip').on('click', function () {
		$('p.tip').removeClass('tip_selected');
	});

	// on people keyup
	$('#people').on('keyup', function () {
		AppVars.people = $('#people').val().trim();
		// console.log(AppVars.people);
		if (AppVars.people != '') {
			checkPeopleValue();
			calculateBillPp();
			calculateTipPp();
			calculateTotalPp();
			activateResetBtn();
		} else {
			$('.bill_amt').html('0.00');
			$('.tip_amt').html('0.00');
			$('.total_amt').html('0.00');
		}
	});

	function calculateBillPp() {
		let billPp = '';
		billPp += (AppVars.billAmt / AppVars.people).toFixed(1);
		$('.bill_amt').html(billPp);
	}
	function calculateTipPp() {
		let tipAmt = '';
		tipAmt += (AppVars.tipPercent * AppVars.billAmt) / 100;
		console.log(tipAmt);
		let tipAmtPp = '';
		tipAmtPp += (tipAmt / AppVars.people).toFixed(1);
		$('.tip_amt').html(tipAmtPp);
	}
	function calculateTotalPp() {
		let totalPp = '';
		totalPp += (+$('.bill_amt').html() + +$('.tip_amt').html()).toFixed(1);
		$('.total_amt').html(totalPp);
	}
	function activateResetBtn() {
		if (
			!($('.bill_amt').html() == '0.00') |
			!($('.tip_amt').html() == '0.00') |
			!($('.total_amt').html() == '0.00')
		) {
			$('.reset_btn').addClass('activate_reset_btn');
		} else {
			$('.reset_btn').removeClass('activate_reset_btn');
		}
	}
	function checkBillValue() {
		if (+AppVars.billAmt < +AppVars.people) {
			$('.bill_error').show();
            resetApp()
			setTimeout(() => {
				$('.bill_error').hide();
			}, 3000);
		}
	}
	function checkPeopleValue() {
		if (+AppVars.people > +AppVars.billAmt) {
			$('#people').val('');
			$('.people_error').show();
			setTimeout(() => {
				$('.people_error').hide();
			}, 3000);
		}
	}

	function resetApp() {
		$('.total_amt').html('0.00');
		$('.tip_amt').html('0.00');
		$('.bill_amt').html('0.00');
		$('#people').val('');
		$('.tip').removeClass('tip_selected enable_tip');
		$('#bill').val('').focus();
		$('.reset_btn').removeClass('activate_reset_btn');
	}

	$('.reset_btn').on('click', function () {
		resetApp();
	});
});
