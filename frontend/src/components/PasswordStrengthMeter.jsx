const PasswordStrengthMeter = ({ password, passwordStrength, setPasswordStrength }) => {
    const getStrength = (pass) => {
        if (!pass) return;
        let strength = 0;
        if (/[a-z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[@$!%*?&#^+=]/.test(pass)) strength++;
        return strength;
    };
    setPasswordStrength(getStrength(password));

    const passwordStrengthProgress = (strength) => {
        switch (strength) {
            case 1:
                return (
                    <progress
                        className='mt-5 progress progress-error'
                        value='25'
                        max='100'
                    />
                );
            case 2:
                return (
                    <progress
                        className='mt-5 progress progress-accent'
                        value='50'
                        max='100'
                    />
                );
            case 3:
                return (
                    <progress
                        className='mt-5 progress progress-warning'
                        value='75'
                        max='100'
                    />
                );
            case 4:
                return (
                    <progress
                        className='mt-5 progress progress-success'
                        value='100'
                        max='100'
                    />
                );
            default:
                if (password.length < 6)
                    return (
                        <progress
                            className='mt-5 progress'
                            value='0'
                            max='100'
                        />
                    );
        }
    };
    return <div>{passwordStrengthProgress(passwordStrength)}</div>;
};

export default PasswordStrengthMeter;
