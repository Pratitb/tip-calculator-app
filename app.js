const AppVars = {
	billAmt: '',
	tipPercent: '',
	people: '',
	totalTip: '',
	finalTotal: '',
	contriPp: '',
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
			calculateBill();
			calculateTotalTip();
			calculateFinalTotal();
			contriPp();
		} else {
		}
		// console.log(billAmt);
	});
	// on tip click
	$('p.tip').on('click', function () {
		$('.custom_tip').val('');
		$('p.tip').removeClass('tip_selected');
		$(this).addClass('tip_selected');
		AppVars.tipPercent = $(this).data('number');
		// console.log(AppVars.tipPercent, 'tip percent');
		$('#people').val('').focus().addClass('enable_input');
		// console.log(AppVars.tipPercent);
	});
	// on custom tip click
	$('.custom_tip').on('click', function () {
		$('p.tip').removeClass('tip_selected');
		$('#people').addClass('enable_input').val('');
		AppVars.tipPercent = '';
		console.log(AppVars.tipPercent, 'tip percent');
	});
	// on custom tip keyup
	$('.custom_tip').on('keyup', function () {
		const customTip = $('.custom_tip').val();
		if (customTip != '') {
			AppVars.tipPercent = +customTip;
			console.log(AppVars.tipPercent, 'tip percent');
		} else {
			console.log('please select a tip');
		}
	});
	// on people keyup
	$('#people').on('keyup', function () {
		AppVars.people = $('#people').val().trim();
		// console.log(AppVars.people);
		if (AppVars.people != '') {
			checkPeopleValue();
			calculateBill();
			calculateTotalTip();
			calculateFinalTotal();
			contriPp();
			activateResetBtn();

			console.log(AppVars.billAmt, 'bill');
			console.log(AppVars.tipPercent, 'tip');
			console.log(AppVars.people, 'people');
			console.log(AppVars.totalTip, 'total tip');
			console.log(AppVars.finalTotal, 'final total');
			console.log(AppVars.contriPp, 'contri');
			console.log('');
			console.log('');
		} else {
			$('.bill_amt').html('0.00');
			$('.tip_amt').html('0.00');
			$('.total_amt').html('0.00');
		}
	});

	function calculateBill() {
		let formatBillAmt = formatNumber(+AppVars.billAmt);
		$('.bill_amt').html(formatBillAmt);
	}
	function calculateTotalTip() {
		AppVars.totalTip = ((AppVars.tipPercent * AppVars.billAmt) / 100).toFixed(
			0
		);
		let formatTipAmt = formatNumber(+AppVars.totalTip);
		$('.tip_amt').html(formatTipAmt);
	}
	function calculateFinalTotal() {
		AppVars.finalTotal = Math.round(+AppVars.billAmt + +AppVars.totalTip);
		let formatFinalTotal = formatNumber(+AppVars.finalTotal);
		$('.total_amt').html(formatFinalTotal);
	}
	function contriPp() {
		// console.log(AppVars.finalTotal);
		// console.log(AppVars.people);

		AppVars.contriPp = Math.round(+AppVars.finalTotal / +AppVars.people);
		// console.log(AppVars.contriPp);

		let formatContri = formatNumber(+AppVars.contriPp);
		// console.log(formatContri);

		$('.contri_pp').html(formatContri);
	}
	function formatNumber(number) {
		// Check if the number is an integer
		if (Number.isInteger(number)) {
			return number.toLocaleString();
		}
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
			resetApp();
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
		$('.total_amt, .tip_amt, .bill_amt, .contri_pp').html('0.00');
		AppVars.people = '';
		$('#people, .custom_tip, #bill').val('');
		$('.tip').removeClass('tip_selected enable_tip');
		$('#bill').focus();
		$('.reset_btn').removeClass('activate_reset_btn');
		// console.log(AppVars.people, 'number of people');
	}
	// console.log(AppVars.billAmt, 'bill');

	$('.reset_btn').on('click', function () {
		resetApp();
	});
});
