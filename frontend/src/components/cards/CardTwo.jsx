import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import background from '../../assets/submit.jpg'


export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={background}
          alt="Submit Lesson Plan"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Submit Lesson Plan
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Submit You're Lesson Plan
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
