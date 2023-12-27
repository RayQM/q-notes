
 const formatDate = (notes) =>{
        const parsedDate = new Date(notes.date);
        const formattedDate = parsedDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return formattedDate;
      }
export default formatDate