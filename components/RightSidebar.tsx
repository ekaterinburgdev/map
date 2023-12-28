import styled from 'styled-components';

export const RightSidebar = styled.div`
    width: 50%;
    max-width: 400px;
    position: fixed;
    top: 8px;
    right: 8px;
    z-index: 401;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: calc(100vh - 120px);
`;
