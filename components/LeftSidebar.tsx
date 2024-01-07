import styled from 'styled-components';

export const LeftSidebar = styled.div`
    width: 29%;
    min-width: 340px;
    max-width: 435px;
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 401;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: calc(100vh - 120px);
`;