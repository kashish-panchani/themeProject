export const handleCollection = () => {
  const collection = document.getElementById('collectionID');
  let collectionTopRequiredMargin =  75;
  window.scrollTo({
    top: collection?.getBoundingClientRect().top + window.scrollY - collectionTopRequiredMargin,
    behavior: "smooth"
  });
}