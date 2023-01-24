import { IconType } from './Icons.types';
import { Copy } from './Copy';
import { Link } from './Link';
import { OKN } from './OKN';
import { Pdf } from './Pdf';

export const ICON_BY_TYPE = {
    [IconType.Copy]: Copy,
    [IconType.Link]: Link,
    [IconType.OKN]: OKN,
    [IconType.Pdf]: Pdf,
};
