// Imports
import { BrowserRouter } from "react-router-dom";
import {render, screen} from '@testing-library/react';
// Import Component
import { Header } from "..";

const MockHeader = () => {
    return (
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    )
}

// test
test('Render Header Correctly', () => {

    render(<MockHeader />);
    const h1Element = screen.getByText('GeoMarker');
    expect(h1Element).toBeInTheDocument();
})