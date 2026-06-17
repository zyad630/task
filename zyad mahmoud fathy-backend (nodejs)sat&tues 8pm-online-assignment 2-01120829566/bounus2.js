var findKthPositive = function(arr, k) {
    let num = 1;
    while (true) {
        if (!arr.includes(num)) {
            k--;
            if (k === 0) {
                return num;
            }
        }
        num++;
    }
};