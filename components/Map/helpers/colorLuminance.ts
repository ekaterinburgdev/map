export function colorLuminance(hexColor: string, luminance: number) {
    const hex = hexColor.replace(/[^0-9a-f]/gi, '');
    let color = '#';

    for (let i = 0; i < 3; i++) {
        let component = parseInt(hex.substr(i * 2, 2), 16);
        component = Math.round(Math.min(Math.max(0, component + (component * luminance)), 255));
        const hexComponent = component.toString(16).padStart(2, '0');
        color += hexComponent;
    }

    return color;
}
