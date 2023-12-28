import React from 'react';
import styled from 'styled-components';
import { Loader } from 'shared/UI/Loader/Loader';

const FilterLoaderContainer = styled.div`
    position: relative;
    height: 128px;
`;

export function FilterLoader() {
    return (
        <FilterLoaderContainer>
            <Loader />
        </FilterLoaderContainer>
    );
}
