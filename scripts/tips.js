/*global console, clog, jQuery, $  */
/*jslint es5:true, white:false  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

Date.prototype.getWeek = function () {
    var day_miliseconds = 86400000,
    onejan = new Date(this.getFullYear(), 0, 1, 0, 0, 0),
    onejan_day = (onejan.getDay() == 0) ? 7 : onejan.getDay(),
    days_for_next_monday = (8 - onejan_day),
    onejan_next_monday_time = onejan.getTime() + (days_for_next_monday * day_miliseconds),
    first_monday_year_time = (onejan_day > 1) ? onejan_next_monday_time : onejan.getTime(),
    this_date = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),
    this_time = this_date.getTime(),
    days_from_first_monday = Math.round(((this_time - first_monday_year_time) / day_miliseconds));
    return (days_from_first_monday >= 0 && days_from_first_monday < 364) ? Math.ceil((days_from_first_monday + 1) / 7) : 52;
};

var Tips = {
    offset: 9,
    week  : new Date().getWeek(),
    list  : [
    'Experts recommend setting aside at least three months’ worth of emergency savings in case something unexpected happens, such as job loss or an injury.',
    'Consider setting up automatic payments from your checking or savings account to ensure timely credit card, mortgage, or other recurring bill payments.',
    'To help avoid overdrafts, set up low balance alerts through online banking.',
    'In your 20s start thinking ahead by identifying your life goal priorities and start the habits of saving and investing.',
    'In your 30s build a foundation as your income increases by allocating additional funds to invest and save in your 401(k)',
    'In your 40s, invest in your future with wise investment choices. You should keep everything on track by using credit wisely and making sure your assets are protected.',
    'In your 50s get ready for retirement by consolidating your investment accounts, simplifying your portfolio and paying off debt.',
    'In your 60s make the transition into retirement by beginning to pay yourself. Consider investments with income potential and less risk.',
    'Don’t underestimate the impact that time can have on your financial plan. Start saving now.',
    'Consider long-term care insurance to help protect your retirement assets from being drastically depleted over a short period of time.',
    'The option of downsizing your home in retirement can provide cash-on-hand and less worries about maintenance, property taxes and utility bills.',
    'If you don’t have access to a retirement plan at work, an IRA can be a great way to save for retirement.',
    'Consider participating in your company’s retirement plan, especially if your employer matches contributions.',
    'Keep your identity safe by being informed. Monitor your credit card bills and bank statements carefully, review your credit report at least once a year, and enroll in an online monitoring service.',
    'Limit your paper trail by receiving online delivery of important documents. Shred paper statements before throwing them away.',
    'Keep your teen driver safe by choosing a safe car and being a good role model by demonstrating good driving habits. Also, talk to your teens about the dangers of driving under the influence of alcohol and drugs, and texting while driving, which is illegal in most states.',
    'Install smoke detectors in your home to save on your homeowners insurance premiums. And don’t forget to change the batteries in your smoke detectors when you change your clock settings in the spring and fall each year.',
    'Saving money may be easier than you think. Consider raising the deductible on your homeowners insurance. The higher your deductible, the more you save on your premium.',
    'The best way to determine if you have enough homeowners insurance is to conduct a property inventory to estimate the value of everything you own.',
    'Whether you’re a first-time home buyer, seller, or existing homeowner, a home protection plan can be an affordable way to protect yourself from unexpected repairs, bills, and inconveniences.',
    'Would anyone who depends on you suffer financially if you weren’t around tomorrow? If the answer is “yes,” then you need life insurance.',
    'Your homeowners insurance might not cover your home-based business. Ask your insurance agent to make sure.',
    'Pet insurance can help you reduce your pet’s preventive and routine health care costs, while protecting you from unforeseen emergency and medical expenses.',
    'Build and better manage your credit by paying bills on time and staying below your credit limit.',
    'Pay more than your credit card’s minimum monthly payment to help reduce the amount of interest you pay',
    'Help your children learn about money. Engage your kids early and often in conversations about money.',
    'Help your child create a personal budget to show them the importance of saving for the things they want',
    'Know a high school student planning for college? Help them prepare by going to wellsfargo.com/collegesteps.',
    'Paying extra toward your student loan or making interest payments while in school can help lower the total amount you pay.',
    'Traveling abroad? Arriving with foreign currency prepares you to meet incidental expenses like taxis, tips and small meals',
    ],
    set: function (num) {
        num = num || (this.week - this.offset);
        $('#TipP').text(this.list[num]);     // We are about 8 weeks into the new year... offset by that
    },
    init: function () {
        Tips.set(Args('week'));
    },
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
