export function formatView(views){
    if(views >= 1000000){
        return (views/1000000).toFixed(1) + 'M';
    }else if(views >= 1000){
        return (views/1000).toFixed(1) + 'K';
    }else{
        return views;
    }
}