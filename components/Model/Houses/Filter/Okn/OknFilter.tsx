import React from 'react';

import { Checkbox } from 'components/UI/Checkbox/Checkbox';

// TODO https://github.com/ekaterinburgdev/map/issues/16
// It's checkbox test

export function OknFilter() {
    return (
        <>
            <div style={{ opacity: 0.25, pointerEvents: 'none' }}>
                {
                    [
                        { color: '#8d0b00', label: 'Федерального значения' },
                        { color: '#60008d', label: 'Регионального значения' },
                        { color: '#027000', label: 'Муниципального значения' },
                    ].map(({ color, label }, i) => (
                        <>
                            <Checkbox id={`okn-${i}`} checked color={color} onClick={() => { }}>
                                {label}
                            </Checkbox>
                            <div style={{ marginBottom: 14 }} />
                        </>
                    ))
                }
                <hr style={{
                    background: '#2a2b3c',
                    border: 0,
                    margin: '16px 0',
                    height: '1px',
                }}
                />
                {
                    [
                        { color: '#ff640f', label: 'Границы территорий ОКН', description: 'Объект культурного наследия и неотделимая от него территория' },
                        { color: '#00b4ff', label: 'Зоны охраны ОКН', description: 'Территории, в пределах которых запрещены любые работы, так как они могут причинить вред объекту' },
                        { color: '#e800b5', label: 'Защитные зоны', description: 'Временная зона в 100-250 метров вокруг объекта, у которого пока не указана зона охраны' },
                    ].map(({ color, label, description }, i) => (
                        <>
                            <Checkbox id={`okn-zones-${i}`} checked color={color} onClick={() => { }}>
                                {label}
                                <br />
                                <small style={{ color: '#9BAAC3' }}>{description}</small>
                            </Checkbox>
                            <div style={{ marginBottom: 14 }} />
                        </>
                    ))
                }
            </div>
        </>

    );
}
