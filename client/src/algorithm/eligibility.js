export function showEligibility(age, doseNumber, lastVaxBrand, dateInterval) {
        if (age >= 18) {
            if (!doseNumber) {
                console.log("you are eligible for Pfizer vaccine first shot")
                return "you are eligible for Pfizer vaccine first shot"
            } else if (doseNumber === 1) {
                if (lastVaxBrand.contains("Pfizer")) {
                    if (dateInterval >= 21) {
                        console.log("you are eligible for Pfizer vaccine second shot")
                        return "you are eligible for Pfizer vaccine second shot"
                    } else {
                        console.log("no vaccination needed as of today")
                        return "no vaccination needed as of today"
                    }
                } else if (lastVaxBrand.contains("Moderna")) {
                    if (dateInterval >= 28) {
                        console.log("you are eligible for Moderna vaccine second shot")
                        return "you are eligible for Moderna vaccine second shot"
                    } else {
                        console.log("no vaccination needed as of today")
                        return "no vaccination needed as of today"
                    }
                } else if (lastVaxBrand.contains("Johnson")) {
                    if (dateInterval >= 60) {
                        console.log("you are eligible for Pfizer or Moderna booster shot")
                        return "you are eligible for Pfizer or Moderna booster shot"
                    } else {
                        console.log("no vaccination needed as of today")
                        return "no vaccination needed as of today"
                    }
                }
            } else if (doseNumber === 2) {
                if (dateInterval >= 180) {
                    console.log("you are eligible for Pfizer or Moderna booster shot")
                    return "you are eligible for Pfizer or Moderna booster shot"
                } else {
                    console.log("no vaccination needed as of today")
                    return "no vaccination needed as of today"
                }
            } else {
                console.log("no vaccination needed as of today")
                return "no vaccination needed as of today"
            }
        } else if (age >= 12 && age < 18) {
            if (!doseNumber) {
                console.log("you are eligible for Pfizer vaccine first shot")
                return "you are eligible for Pfizer vaccine first shot"
            } else if (doseNumber === 1) {
                if (dateInterval >= 21) {
                    console.log("you are eligible for Pfizer vaccine second shot")
                    return "you are eligible for Pfizer vaccine second shot"
                } else {
                    console.log("no vaccination needed as of today")
                    return "no vaccination needed as of today"
                }
            } else if (doseNumber === 2) {
                if (dateInterval >= 180) {
                    if (age >= 16 && age < 18) {
                        console.log("you are eligible for a Pfizer booster shot")
                        return "you are eligible for a Pfizer booster shot"
                    } else {
                        console.log("no vaccination needed as of today")
                        return "no vaccination needed as of today"
                    }
                } else {
                    console.log("no vaccination needed as of today")
                    return "no vaccination needed as of today"
                }
            } else {
                console.log("no vaccination needed as of today")
                return "no vaccination needed as of today"
            }
        } else if (age >= 5 && age < 12) {
            if (!doseNumber) {
                console.log("you are eligible for Pfizer vaccine first shot")
                return "you are eligible for Pfizer vaccine first shot"
            } else if (doseNumber === 1) {
                if (dateInterval >= 21) {
                    console.log("you are eligible for Pfizer vaccine second shot")
                    return "you are eligible for Pfizer vaccine second shot"
                } else {
                    console.log("no vaccination needed as of today")
                    return "no vaccination needed as of today"
                }
            } else if (doseNumber === 2) {
                console.log("no vaccination needed as of today")
                return "no vaccination needed as of today"
            }
        } else {
            console.log("no suitable vaccine for you as of today")
            return "no suitable vaccine for you as of today"
        }
    }

export function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function getDateInterval(dateString) {

    let date1 = new Date();
    let date2 = new Date(dateString);

    // To calculate the time difference of two dates
    let Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
}