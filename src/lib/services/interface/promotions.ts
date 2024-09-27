export type Platform = {
  name: string;
  description?: string;
  selected: boolean;
};

export interface ButtonOption {
  value: string;
  label: string;
}

export interface AudienceInfos {
    age: string;
    gender: string;
    locations: string[];
    interests: string[];
    sources: string[];
  }
  export interface Create_Post {
    platform: string[];
    media: string[];
    fb_message:string;
    insta_message:string;
    dateTime:string;
    link:string;
  }
