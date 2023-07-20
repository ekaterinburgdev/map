type TLinesCardContentProps = {
    placemark: object
};

export function LinesCardContent({ placemark }: TLinesCardContentProps) {
    return (
        <>
            some content
            {placemark}
        </>
    );
}
