import Image from "next/image";

interface Base64ImageProps {
    base64String: string;
}

const Base64Image: React.FC<Base64ImageProps> = ({ base64String }) => {
    return (
        <Image src={`data:image/png;base64,${base64String}`} alt="Base64 Image" width={300} height={300} />
    );
};

export default Base64Image;