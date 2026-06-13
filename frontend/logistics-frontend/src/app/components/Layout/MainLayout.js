"use client";

import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`

export default function MainLayout({ children }) {
    return <Container>{children}</Container>
}