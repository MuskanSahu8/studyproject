class ApiError extends Error{
    constructor(statusCode,message="something went wrong",error=[],stack="",success){
        super(message),
        this.message=message,
        this.statusCode=statusCode,
        this.data=null,
        this.error=error,
        this.success=false
            if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
        }
    }
    export {ApiError}
