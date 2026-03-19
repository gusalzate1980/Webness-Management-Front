export class Validation
{
    public Errors: string[] = [];

    public IsvalidCustomizedString(value:string,
                                            onlyNumbers:boolean,
                                            isEmail:boolean,
                                            minLength:number,
                                            maxLength:number,
                                            canHaveSpaces:boolean,
                                            canHaveSpecialChars:boolean,
                                            canHaveNumbers:boolean): boolean
    {
        this.Errors = [];
        if(onlyNumbers)
        {
            if (/^\d+$/.test(value))
            {
                if (value.length >= minLength && value.length <= maxLength)
                    return true;
                else
                {
                    this.Errors.push("Length between "+minLength+" and "+maxLength+" characters");
                    return false;
                }
            }
            else 
            {
                this.Errors.push("Only must contains numbers");
                return false;
            }
        }

        if(isEmail)
        {
            if(this.IsValidEmail(value))
                return true;
            else
            {
                this.Errors.push("This is not a valid email address");
                return false;
            }
                
        }
         
        let isOk:boolean = true;
        if (value.length < minLength || value.length > maxLength)
        {
            isOk = false;
            this.Errors.push("Length between "+minLength+" and "+maxLength);
        }
        
        if(!canHaveSpaces && /\s/.test(value))
        {
            this.Errors.push("Can not contain spaces");
            isOk = false;
        }
        
        if (!canHaveSpecialChars && /[!"·$%&/()=?¿,.\-_/*+\[\]{}]/.test(value))
        {
            this.Errors.push("Can not contain special chars");
            isOk = false;
        }
        
        if(!canHaveNumbers && /\d/.test(value))
        {
            this.Errors.push("Can not contain numbers");
            isOk = false;
        }
        return isOk;
    }

    private IsValidEmail(value:string): boolean
    {
        if  (value.includes("@@") || 
            value.includes("@.") ||
            value.includes(".@") ||
            value.includes("..") ||
            value.startsWith("@") ||
            value.startsWith(".") ||
            value.endsWith("@") ||
            value.endsWith(".") ||
            !value.includes(".") ||
            !value.includes("@") ||
            /[!"$%&/()=?¿,\/*+\[\]{}]/.test(value))
        {
            return false;
        }

        return true;
    }
}