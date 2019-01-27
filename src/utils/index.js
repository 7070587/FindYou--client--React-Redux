/*
包含多個工具函數的模塊
 */


/*
帳號主界面路由
wantJob：/wantjob
applyJob：/applyjob

帳號訊息完善界面路由
wantJob：/wantjobinfo
applyJob：/applyjobinfo

判斷是否已經完善訊息？user.avatar是否有值
判斷帳號類型：user.type
 */


// 返回對應的路由路徑
export function getRedirectTo(type, avatar) {
    let path;

    // type
    if (type === "applyJob") {
        path = '/applyjob';
    } else {
        path = '/wantjob';
    }

    // avatar
    if (!avatar) {   // 沒有值，返回訊息完善的界面path
        path += 'info';
    }

    return path;
}