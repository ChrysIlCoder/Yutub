import { IAccount } from "../routes/accounts";
import { IChannel } from "../routes/channels";
import { IVideo } from "../routes/videos";

export const accounts: IAccount[] = [
  {
    first_name: "Micheal",
    last_name: "Johnson",
    email: "micheal.johnson@gmail.com",
    password: "$2b$10$oqubaeI3KfV4pqU19kREd.3miNlae6psIkTTNuEUckHNcmm2pZ1Ca",
    id: "796h3f52-fc5f-46d2-9f13-f35671fb385a",
    subscribed_to: [
      "744b3f52-fc4f-46d2-9f13-f32541fb385a",
    ],
    channel: {
      id: "796h3f52-fc5f-46d2-9f13-f35671fb385a",
      name: "Micheal",
      description: "This is Micheal's channel",
      subscribers_count: 1,
      channel_banner:
        "http://[your-ip]:3000/assets/default_files/banner_default.svg",
      channel_profile_pic:
        "http://[your-ip]:3000/assets/default_files/profile_pic_default.svg"
    },
  },
  {
    first_name: "Christian",
    last_name: "Boffa",
    email: "chri.boffa@gmail.com",
    password: "$2b$10$oqubaeI3KfV4pqU19kREd.3miNlae6psIkTTNuEUckHNcmm2pZ1Ca",
    id: "744b3f52-fc4f-46d2-9f13-f32541fb385a",
    subscribed_to: [
      "796h3f52-fc5f-46d2-9f13-f35671fb385a"
    ],
    channel: {
      id: "744b3f52-fc4f-46d2-9f13-f32541fb385a",
      name: "ChrysTheBoss",
      description: "It's me. The final c̶o̶u̶n̶t̶d̶o̶w̶n boss.",
      subscribers_count: 1,
      channel_banner:
        "http://[your-ip]:3000/assets/channels/uploads/744b3f52-fc4f-46d2-9f13-f32541fb385a/744b3f52-fc4f-46d2-9f13-f32541fb385a-bello-colpo-delle-montagne-che-riflettono-nel-lago-freddo-sotto-il-cielo-nuvoloso.jpg",
      channel_profile_pic:
        "http://[your-ip]:3000/assets/channels/uploads/744b3f52-fc4f-46d2-9f13-f32541fb385a/744b3f52-fc4f-46d2-9f13-f32541fb385a-Prrr_Estivo.png"
    },
  },
];

export const videos: IVideo[] = [
  {
    status: 200,
    video_info: {
      title: "My first video",
      description: "This is my first video",
      thumbnail_url: "http://[your-ip]:3000/assets/videos/uploads/2637637b-6df0-40b1-a5c0-1f03c7ef8c4f/2637637b-6df0-40b1-a5c0-1f03c7ef8c4f-Prrr_Natalizio.png",
      video_url: "http://[your-ip]:3000/assets/videos/uploads/2637637b-6df0-40b1-a5c0-1f03c7ef8c4f/2637637b-6df0-40b1-a5c0-1f03c7ef8c4f-Non_mi_ha_dato_l'autografo.mp4"
    },
    uuid: "2637637b-6df0-40b1-a5c0-1f03c7ef8c4f",
    channel: accounts[0].channel,
    created_at: new Date(),
    comments: [
      {
        status: 200,
        video_uuid: "2637637b-6df0-40b1-a5c0-1f03c7ef8c4f",
        comment_info: {
          comment: "Test comment",
          channel: accounts[1].channel
        },
        created_at: new Date(),
        id: "2637637b-6df0-40b1-a5c0-1f03c7ef8c4f-6122451200"
      }
    ],
    views: 0
  },
];