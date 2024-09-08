
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function PrimeSelection({data, handle, label, name, startValue, error}) {

    const [selectedCountry, setSelectedCountry] = useState(null);
    // const countries = [
    //     { name: 'Australia', code: 'AU' },
    //     { name: 'Brazil', code: 'BR' },
    //     { name: 'China', code: 'CN' },
    //     { name: 'Egypt', code: 'EG' },
    //     { name: 'France', code: 'FR' },
    //     { name: 'Germany', code: 'DE' },
    //     { name: 'India', code: 'IN' },
    //     { name: 'Japan', code: 'JP' },
    //     { name: 'Spain', code: 'ES' },
    //     { name: 'United States', code: 'US' }
    // ];
    // console.log(selectedCountry)
    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${''}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${''}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center flex-col">
            <label htmlFor={name}>{label}</label>
        
            <Dropdown
            name={name}
            value={selectedCountry} onChange={(e) => {
              setSelectedCountry(e.value)
              handle(e)
            }} 
            options={data} optionLabel="name" placeholder={startValue} 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />

          { error && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error[0]}</p>
          )}
        </div>    
    )
}
        