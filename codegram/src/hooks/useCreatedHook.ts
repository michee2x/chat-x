export const createdAt = (timeStamp:string) => {

    let time = Date.parse(timeStamp)
    let now = Date.now()
    let secondsPast = (now - time) / 1000
    let suffix = "ago"


    let intervals:any = {
        yr:31536000,
        mth:2592000,
        wk:604800,
        day:86400,
        hr:3600,
        min:60,
        sec:1
    }

    for (let i in intervals){
        let interval = intervals[i]

        if(secondsPast >= interval){
            let count = Math.floor(secondsPast / interval)
            return `${count} ${i}${count > 1 ? "s" : ""} ${suffix}`
        }
    }
}

