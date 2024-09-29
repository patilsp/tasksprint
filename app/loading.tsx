import Image from "next/image";

const Loading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <Image
        src='images/icons/loader.svg'
        width={40}
        height={40}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;
