import { Message } from 'element-ui'
export default (data) => {
    data.$axios.onError(err => {
        console.log(err.response);
        const { statusCode, message } = err.response.data
        if (statusCode === 400) {
            Message.error(message)
        }
        if (statusCode === 401 || statusCode === 403) {
            console.log(data);
            Message.error('请先登录')
            data.redirect(200, '/user/login', {
                returnUrl: data.route.fullPath
            })
        }
    })

}