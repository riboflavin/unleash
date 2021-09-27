import React, { ChangeEvent, useState } from 'react';
import { Button, Chip, TextField, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ConditionallyRender from '../../../../../common/ConditionallyRender';

interface IStrategyInputList {
    name: string;
    list: string[];
    setConfig: () => void;
    disabled: boolean;
}

const StrategyInputList = ({
    name,
    list,
    setConfig,
    disabled,
}: IStrategyInputList) => {
    const [input, setInput] = useState('');
    const ENTERKEY = 'Enter';

    const onBlur = (e: ChangeEvent) => {
        setValue(e);
    };

    const onKeyDown = (e: ChangeEvent) => {
        if (e?.key === ENTERKEY) {
            setValue(e);
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const setValue = (evt: ChangeEvent) => {
        evt.preventDefault();
        const value = evt.target.value;

        if (value) {
            const newValues = value
                .split(/,\s*/)
                .filter(a => !list.includes(a));
            if (newValues.length > 0) {
                const newList = list.concat(newValues).filter(a => a);
                setConfig(name, newList.join(','));
            }
            setInput('');
        }
    };

    const onClose = (index: number) => {
        list[index] = null;
        setConfig(
            name,
            list.length === 1 ? '' : list.filter(Boolean).join(',')
        );
    };

    const onChange = e => {
        setInput(e.currentTarget.value);
    };

    return (
        <div>
            <Typography variant="subtitle2">List of {name}</Typography>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '10px 0',
                }}
            >
                {list.map((entryValue, index) => (
                    <Chip
                        key={index + entryValue}
                        label={entryValue}
                        style={{ marginRight: '3px' }}
                        onDelete={disabled ? undefined : () => onClose(index)}
                        title="Remove value"
                    />
                ))}
            </div>
            <ConditionallyRender
                condition={!disabled}
                show={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            name={`input_field`}
                            variant="outlined"
                            label="Add items"
                            value={input}
                            size="small"
                            placeholder=""
                            onBlur={onBlur}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                        />
                        <Button
                            onClick={setValue}
                            color="secondary"
                            startIcon={<Add />}
                        >
                            Add
                        </Button>
                    </div>
                }
            />
        </div>
    );
};

export default StrategyInputList;
