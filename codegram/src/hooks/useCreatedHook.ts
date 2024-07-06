export const createdAt = (timeStamp:string) => {

    let time = Date.parse(timeStamp)
    let now = Date.now()
    let secondsPast = (now - time) / 1000
    let suffix = "ago"


    let intervals:any = {
        y:31536000,
        m:2592000,
        w:604800,
        d:86400,
        h:3600,
        min:60,
        s:1
    }

    for (let i in intervals){
        let interval = intervals[i]

        if(secondsPast >= interval){
            let count = Math.floor(secondsPast / interval)
            return `${count} ${i}${count > 1 ? "s" : ""} ${suffix}`
        }
    }
}

