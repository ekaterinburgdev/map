interface ImageParameters {
  width: string | number;
  height: string | number;
  src: string;
}

export interface Image {
  id: string;
  s: ImageParameters;
  m?: ImageParameters;
}
