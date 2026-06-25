var majorityElement = function(nums) {
    let counter = {};
    for(let num of nums){
        counter[num] = (counter[num] || 0) + 1;
        if(counter[num] > nums.length / 2){
            return num;
        }
    }
};